package repository

import (
	"fmt"
	"testing"

	"github.com/yusufcanb/roc/pkg/types"
)

// TestCreateProject calls repository.Project with a name, checking
// for a valid return value.
func TestCreateProject(t *testing.T) {
	p := types.Project{Id: "1", Name: "Hello World!", IsDefault: true}
	ok := SaveProject(p)
	if !ok {
		t.Fatalf("Unable to save project")
	}

	returned := rdb.Get(ctx, fmt.Sprintf(keyStr, p.Id))
	if value, err := returned.Result(); err == nil {
		if value != p.AsJson() {
			t.Fatalf("Does not matched")
		}
	} else {
		t.Fatal(err)
	}
}

func TestGetProjectList(t *testing.T) {
}

// TestGetProject calls repository.GetProject with an identifier
// for a valid return value.
func TestGetProject(t *testing.T) {
	_, err := GetProjectById("1")
	if err != nil {
		t.Fatal(err)
	}
}
