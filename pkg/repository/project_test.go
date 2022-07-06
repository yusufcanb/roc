package repository

import (
	"testing"

	"github.com/yusufcanb/roc/pkg/types"
)

// TestCreateProject calls repository.Project with a name, checking
// for a valid return value.
func TestCreateProject(t *testing.T) {
	p := types.Project{Id: "1", Name: "Hello World!", IsDefault: true}
	err := SaveProject(&p)

	if err != nil {
		t.Fatal(err)
	}

	returned := rdb.HGetAll(ctx, GetProjectKey(p.Id))
	if value, err := returned.Result(); err == nil {
		if value["id"] != p.Id {
			t.Fatalf("Does not matched")
		}
	} else {
		t.Fatal(err)
	}
}

// TestGetProject calls repository.GetProject with an identifier
// for a valid return value.
func TestGetProject(t *testing.T) {
	id := "hello-world"
	p, err := GetProjectById(id)
	if err != nil {
		t.Fatal(err)
	}
	t.Log(p)
	if p.Id != id {
		t.Fatal("Incorrect object returned")
	}
}

func Test_Playground(t *testing.T) {
	projects := GetProjectList()
	for _, v := range *projects {
		t.Log(v)
	}
}
