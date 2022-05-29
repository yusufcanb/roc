package job

import "time"

// Job is defining a representation of the task execution
type Job struct {
	AgentId       string // AgentId of the agent which the job will be executed on
	EnvironmentId string // EnvironmentId of the job defines the execution variables

	StartedAt  time.Time
	FinishedAt time.Time
}

func (j *Job) Start() {
	j.StartedAt = time.Now()
}

func (j *Job) Stop() {
	j.FinishedAt = time.Now()
}
