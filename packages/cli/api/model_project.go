/*
 * ROC (Robot Operation Center)
 *
 * K8s Native Automation Platform tailored for Robot Framework script execution. Provides parallelization and centralized reporting by desing. 🤖
 *
 * API version: 2.0.0
 * Contact: yusufcanbayrak@gmail.com
 * Generated by: Swagger Codegen (https://github.com/swagger-api/swagger-codegen.git)
 */
package api

type Project struct {
	// Unique identifier of project
	Id string `json:"id,omitempty"`
	// Detailed description of the project
	Description string `json:"description,omitempty"`
	// Tags for labelling the task force
	Tags []string `json:"tags,omitempty"`
	// Project creation time as UTC format
	CreatedAt string `json:"createdAt,omitempty"`
	// Project update time as UTC format
	UpdatedAt string `json:"updatedAt,omitempty"`
}