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

type Environment struct {
	// Unique identifier of environment
	Id string `json:"id,omitempty"`
	// Project id of the environment
	ProjectId string `json:"projectId,omitempty"`
	// Detailed description of the environment
	Description string `json:"description,omitempty"`
	// Tags for labelling the environment
	Tags []string `json:"tags,omitempty"`
	// Execution variables object
	Variables *interface{} `json:"variables,omitempty"`
}
