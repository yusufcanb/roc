package service

import (
	"context"
	"fmt"
	"time"

	"github.com/jedib0t/go-pretty/table"
	log "github.com/sirupsen/logrus"
	"github.com/yusufcanb/roc-cli/api"
	"github.com/yusufcanb/roc-cli/spec"
	"github.com/yusufcanb/roc-cli/utils"
)

type JobService struct {
	client *api.APIClient
}

type JobCreate struct {
	TaskForceId   string `json:"taskForceId,omitempty"`
	EnvironmentId string `json:"environmentId,omitempty"`
}

func (it *JobService) GetJobsByProjectId(projectId string) {
	jobs, _, err := it.client.JobApi.GetJobsByProject(context.Background(), projectId, nil)
	if err != nil {
		log.Fatalf(err.Error())
	}

	if len(jobs) == 0 {
		log.Printf("No task forces exist on Project<%s>", projectId)
		return
	}

	it.PrintJobsAsTable(jobs)
}

func (it *JobService) GetJobById(projectId string, jobId string) api.Job {
	job, _, err := it.client.JobApi.GetJobById(context.Background(), projectId, jobId)
	if err != nil {
		log.Fatalf(err.Error())
	}

	return job
}

func (it *JobService) CreateJob(projectId string, job JobCreate) string {
	created, response, err := it.client.JobApi.CreateJob(context.Background(), job, projectId)
	if err != nil && response == nil {
		log.Fatalf("ERR.. Error on Job creation...\n%s", err.Error())
	}

	if response.StatusCode != 201 {
		log.Fatalf("ERR.. Error on Job creation...\n%s", err.Error())
	}

	log.Printf("OK.. Job<Id=%s> created\n", created.Id)

	return created.Id
}

func (it *JobService) DeleteJobById(projectId string, jobId string) {
	_, response, err := it.client.JobApi.DeleteJob(context.Background(), projectId, jobId)
	if err != nil && response == nil {
		log.Fatalf("ERR.. Error on job deletion...\n%s", err.Error())
	}

	if response.StatusCode != 200 {
		log.Fatalf("ERR.. Error while deleting the Job<Id=%s>...\n", jobId)
	}

	log.Printf("OK.. Job<Id=%s> deleted\n", jobId)
}

func (it *JobService) PrintJobsAsTable(jobs []api.Job) {
	tw := table.NewWriter()
	rowHeader := table.Row{"Id", "TaskForce", "Environment"}
	tw.AppendHeader(rowHeader)

	rows := make([]table.Row, len(jobs))
	for _, j := range jobs {
		rows = append(rows, table.Row{j.Id, j.TaskForce, j.Environment})
	}

	tw.AppendRows(rows)

	tw.SetIndexColumn(1)
	tw.SetTitle("Jobs")

	fmt.Println(tw.Render())
}

func (it *JobService) ApplyCLISpec(projectId string, applySpec *spec.CLIApplySpec) {
	var job JobCreate
	err := utils.MapToStruct(applySpec.Spec, &job)
	if err != nil {
		log.Fatalf("Error casting spec to ApplySpec as Job kind")
	}

	id := it.CreateJob(projectId, job)
	log.Printf("OK.. Job<%s> started\n", id)

	timeout := time.After(5 * time.Minute)
	tick := time.Tick(2 * time.Second)
	for {
		job := it.GetJobById(projectId, id)
		select {
		case <-tick:
			if job.Status.IsActive {
				log.Printf("OK.. Checking Job<Id=%s> status\n", id)
				continue
			}
			if !job.Status.IsActive {
				fmt.Println(job.Result.Stdout)
				return
			}
		case <-timeout:
			fmt.Println("Timeout reached, breaking out of loop")
			return
		}
	}
}

func NewJobService(client *api.APIClient) JobService {
	jobService := JobService{}
	jobService.client = client
	return jobService
}
