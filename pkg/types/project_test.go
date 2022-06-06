package types

import (
	"testing"
)

// TestCreateProject calls repository.Project with a name, checking
// for a valid return value.
func Test_Project_AsMap(t *testing.T) {
	projectMap := map[string]string{"id": "1", "name": "Default Project", "isDefault": "true"}
	project := new(Project)
	project.FromMap(projectMap)

	if project.Id != "1" {
		t.Fatalf("Ids don't matched")
	}

	if project.Name != "Default Project" {
		t.Fatalf("Names don't matched")
	}
}
