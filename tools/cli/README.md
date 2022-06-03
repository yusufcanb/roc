roc-ctl
=================

ROC Command Line Interface

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g roc-ctl
$ roc-ctl COMMAND
running command...
$ roc-ctl (--version)
roc-ctl/0.1.0-alpha.1 win32-x64 node-v12.15.0
$ roc-ctl --help [COMMAND]
USAGE
  $ roc-ctl COMMAND
...
```
<!-- usagestop -->
```sh-session
$ npm install -g roc-ctl
$ roc COMMAND
running command...
$ roc (--version)
roc-ctl/0.1.0-alpha.0 win32-x64 node-v12.15.0
$ roc --help [COMMAND]
USAGE
  $ roc COMMAND
...
```
<!-- usagestop -->
```sh-session
$ npm install -g oclif-hello-world
$ oex COMMAND
running command...
$ oex (--version)
oclif-hello-world/0.0.0 darwin-x64 node-v16.13.1
$ oex --help [COMMAND]
USAGE
  $ oex COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`roc-ctl agent create`](#roc-ctl-agent-create)
* [`roc-ctl agent delete [ID]`](#roc-ctl-agent-delete-id)
* [`roc-ctl agent list`](#roc-ctl-agent-list)
* [`roc-ctl command`](#roc-ctl-command)
* [`roc-ctl config get-project`](#roc-ctl-config-get-project)
* [`roc-ctl config get-url`](#roc-ctl-config-get-url)
* [`roc-ctl config set-credentials`](#roc-ctl-config-set-credentials)
* [`roc-ctl config set-project PROJECT`](#roc-ctl-config-set-project-project)
* [`roc-ctl config set-url URL`](#roc-ctl-config-set-url-url)
* [`roc-ctl environment create`](#roc-ctl-environment-create)
* [`roc-ctl environment delete [ID]`](#roc-ctl-environment-delete-id)
* [`roc-ctl environment list`](#roc-ctl-environment-list)
* [`roc-ctl environment variables ID`](#roc-ctl-environment-variables-id)
* [`roc-ctl help [COMMAND]`](#roc-ctl-help-command)
* [`roc-ctl job list`](#roc-ctl-job-list)
* [`roc-ctl job report [ID]`](#roc-ctl-job-report-id)
* [`roc-ctl project create`](#roc-ctl-project-create)
* [`roc-ctl project delete [ID]`](#roc-ctl-project-delete-id)
* [`roc-ctl project list`](#roc-ctl-project-list)
* [`roc-ctl task-force create`](#roc-ctl-task-force-create)
* [`roc-ctl task-force delete [ID]`](#roc-ctl-task-force-delete-id)
* [`roc-ctl task-force exec ID`](#roc-ctl-task-force-exec-id)
* [`roc-ctl task-force get-robot ID`](#roc-ctl-task-force-get-robot-id)
* [`roc-ctl task-force list`](#roc-ctl-task-force-list)
* [`roc-ctl task-force set-robot ID`](#roc-ctl-task-force-set-robot-id)

## `roc-ctl agent create`

Create new agent for specific project

```
USAGE
  $ roc-ctl agent create -n <value> [-p <value>] [-o <value>]

FLAGS
  -n, --name=<value>     (required) Name of the agent
  -o, --os=<value>       Name of the agent
  -p, --project=<value>  Project identifier

DESCRIPTION
  Create new agent for specific project

EXAMPLES
  $ roc-ctl agent create -n z3-subnet-1 -p default
  [OK] Agent z3-subnet-1 created
```

## `roc-ctl agent delete [ID]`

Delete agent by its identifier

```
USAGE
  $ roc-ctl agent delete [ID]

DESCRIPTION
  Delete agent by its identifier

EXAMPLES
  $ roc-ctl agent delete agent-1
  [OK] agent-1 deleted
```

## `roc-ctl agent list`

List agents by project

```
USAGE
  $ roc-ctl agent list [-p <value>]

FLAGS
  -p, --project=<value>  Project identifier

DESCRIPTION
  List agents by project

EXAMPLES
  $ roc-ctl agent list -p default
```

## `roc-ctl command`

```
USAGE
  $ roc-ctl command
```

_See code: [dist/commands/command.ts](https://github.com/yusufcanb/roc/blob/v0.1.0-alpha.1/dist/commands/command.ts)_

## `roc-ctl config get-project`

Set configurations for ROC

```
USAGE
  $ roc-ctl config get-project

DESCRIPTION
  Set configurations for ROC

EXAMPLES
  $ roc config get-project
  [OK] default-project
```

## `roc-ctl config get-url`

Set configurations for ROC

```
USAGE
  $ roc-ctl config get-url

DESCRIPTION
  Set configurations for ROC

EXAMPLES
  $ roc config get-url
  [OK] http://example.roc-service.local
```

## `roc-ctl config set-credentials`

Set credentials of ROC

```
USAGE
  $ roc-ctl config set-credentials -k <value> -s <value>

FLAGS
  -k, --key=<value>     (required) API Key of ROC Platform
  -s, --secret=<value>  (required) API Secret of ROC Platform

DESCRIPTION
  Set credentials of ROC

EXAMPLES
  $ roc config set-credentials --key [YOUR_KEY] --secret [YOUR_SECRET]
  [OK] Platform credentials saved
```

## `roc-ctl config set-project PROJECT`

Set default project for Robot Operation Center CLI

```
USAGE
  $ roc-ctl config set-project [PROJECT]

ARGUMENTS
  PROJECT  Identifier of project

DESCRIPTION
  Set default project for Robot Operation Center CLI

EXAMPLES
  $ roc config set-project default-project
  [OK] default project set
```

## `roc-ctl config set-url URL`

Set configurations for ROC

```
USAGE
  $ roc-ctl config set-url [URL]

ARGUMENTS
  URL  URL of the ROC Platform

DESCRIPTION
  Set configurations for ROC

EXAMPLES
  $ roc config set-url https://roc.platform
  ROC platform set to https://roc.platform
```

## `roc-ctl environment create`

Create new environment for specific project

```
USAGE
  $ roc-ctl environment create -n <value> -v <value> [-p <value>] [-d <value>]

FLAGS
  -d, --description=<value>  Description of the environment
  -n, --name=<value>         (required) Name of the environment
  -p, --project=<value>      Project identifier
  -v, --variables=<value>    (required) Variables file of the environment

DESCRIPTION
  Create new environment for specific project

EXAMPLES
  $ roc environment create -p default -n development -v variables.yaml
  [OK] Environment development created
```

## `roc-ctl environment delete [ID]`

Delete environment by its identifier

```
USAGE
  $ roc-ctl environment delete [ID]

DESCRIPTION
  Delete environment by its identifier

EXAMPLES
  $ roc environment delete development
  [OK] Environment development deleted
```

## `roc-ctl environment list`

List environments by project

```
USAGE
  $ roc-ctl environment list [-p <value>]

FLAGS
  -p, --project=<value>  Project identifier

DESCRIPTION
  List environments by project

EXAMPLES
  $ roc environment list -p default
```

## `roc-ctl environment variables ID`

Print variables of the environment

```
USAGE
  $ roc-ctl environment variables [ID]

DESCRIPTION
  Print variables of the environment

EXAMPLES
  $ roc environment variables [env-id]
```

## `roc-ctl help [COMMAND]`

Display help for roc-ctl.

```
USAGE
  $ roc-ctl help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for roc-ctl.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.10/src/commands/help.ts)_

## `roc-ctl job list`

List task forces by project

```
USAGE
  $ roc-ctl job list [-p <value>]

FLAGS
  -p, --project=<value>  Project identifier

DESCRIPTION
  List task forces by project

EXAMPLES
  $ roc task-force list -p default
```

## `roc-ctl job report [ID]`

Open job report in default browser

```
USAGE
  $ roc-ctl job report [ID]

DESCRIPTION
  Open job report in default browser

EXAMPLES
  $ roc job report [job-id]
```

## `roc-ctl project create`

Create new project

```
USAGE
  $ roc-ctl project create -n <value>

FLAGS
  -n, --name=<value>  (required) Name of project

DESCRIPTION
  Create new project

EXAMPLES
  $ roc project create -n New Project
  [OK] New Project created
```

## `roc-ctl project delete [ID]`

Delete project by its identifier

```
USAGE
  $ roc-ctl project delete [ID]

DESCRIPTION
  Delete project by its identifier

EXAMPLES
  $ roc project delete demo-project
  [OK] Environment demo-project deleted
```

## `roc-ctl project list`

List projects

```
USAGE
  $ roc-ctl project list

DESCRIPTION
  List projects

EXAMPLES
  $ roc project list
```

## `roc-ctl task-force create`

Create new task force for specific project

```
USAGE
  $ roc-ctl task-force create -n <value> -f <value> [-p <value>]

FLAGS
  -f, --file=<value>     (required) Robot package file
  -n, --name=<value>     (required) Name of the task force
  -p, --project=<value>  Project identifier

DESCRIPTION
  Create new task force for specific project

EXAMPLES
  $ roc task-force create -n api-health-checker -p default
  [OK] Task Force api-health-checker created
```

## `roc-ctl task-force delete [ID]`

Delete task force by its identifier

```
USAGE
  $ roc-ctl task-force delete [ID]

DESCRIPTION
  Delete task force by its identifier

EXAMPLES
  $ roc task-force delete form-processor
  [OK] Task force form-processor deleted
```

## `roc-ctl task-force exec ID`

Execute task force

```
USAGE
  $ roc-ctl task-force exec [ID] -e <value> -a <value>

FLAGS
  -a, --agent=<value>  (required) Agent identifier
  -e, --env=<value>    (required) Environment identifier

DESCRIPTION
  Execute task force

EXAMPLES
  $ roc task-force exec [task-force-id] --agent agent-1 --env development
  [OK] Job queued with agent agent-1 and environment development
```

## `roc-ctl task-force get-robot ID`

Get robot package of task force

```
USAGE
  $ roc-ctl task-force get-robot [ID] [-o <value>]

FLAGS
  -o, --output=<value>  Output path of downloaded file

DESCRIPTION
  Get robot package of task force

EXAMPLES
  $ roc task-force get-robot [task-force-id]
  [OK] Robot package downloaded.
```

## `roc-ctl task-force list`

List task forces by project

```
USAGE
  $ roc-ctl task-force list [-p <value>]

FLAGS
  -p, --project=<value>  Project identifier

DESCRIPTION
  List task forces by project

EXAMPLES
  $ roc task-force list -p default
```

## `roc-ctl task-force set-robot ID`

Set robot package of task force. It can be a local file or remote git repository url.

```
USAGE
  $ roc-ctl task-force set-robot [ID] [-r <value>] [-f <value>]

FLAGS
  -f, --file=<value>        Local robot package file
  -r, --repository=<value>  Robot repository url

DESCRIPTION
  Set robot package of task force. It can be a local file or remote git repository url.

EXAMPLES
  $ roc task-force set-robot [task-force-id] -f example-robot.zip
  [OK] Robot package uploaded.

  $ roc task-force set-robot [task-force-id] -r https://github.com/yusufcanb/robot-template
  [OK] Robot package set to repository https://github.com/yusufcanb/robot-template.
```
<!-- commandsstop -->
* [`roc agent create`](#roc-agent-create)
* [`roc agent delete [ID]`](#roc-agent-delete-id)
* [`roc agent list`](#roc-agent-list)
* [`roc command`](#roc-command)
* [`roc config get-project`](#roc-config-get-project)
* [`roc config get-url`](#roc-config-get-url)
* [`roc config set-credentials`](#roc-config-set-credentials)
* [`roc config set-project PROJECT`](#roc-config-set-project-project)
* [`roc config set-url URL`](#roc-config-set-url-url)
* [`roc environment create`](#roc-environment-create)
* [`roc environment delete [ID]`](#roc-environment-delete-id)
* [`roc environment list`](#roc-environment-list)
* [`roc environment variables ID`](#roc-environment-variables-id)
* [`roc help [COMMAND]`](#roc-help-command)
* [`roc project create`](#roc-project-create)
* [`roc project delete [ID]`](#roc-project-delete-id)
* [`roc project list`](#roc-project-list)
* [`roc task-force create`](#roc-task-force-create)
* [`roc task-force delete [ID]`](#roc-task-force-delete-id)
* [`roc task-force exec ID`](#roc-task-force-exec-id)
* [`roc task-force list`](#roc-task-force-list)

## `roc agent create`

Create new agent for specific project

```
USAGE
  $ roc agent create -n <value> [-p <value>] [-o <value>]

FLAGS
  -n, --name=<value>     (required) Name of the agent
  -o, --os=<value>       Name of the agent
  -p, --project=<value>  Project identifier

DESCRIPTION
  Create new agent for specific project

EXAMPLES
  $ roc agent create -n z3-subnet-1 -p default
  [OK] Agent z3-subnet-1 created
```

## `roc agent delete [ID]`

Delete agent by its identifier

```
USAGE
  $ roc agent delete [ID]

DESCRIPTION
  Delete agent by its identifier

EXAMPLES
  $ roc agent delete agent-1
  [OK] agent-1 deleted
```

## `roc agent list`

List agents by project

```
USAGE
  $ roc agent list [-p <value>]

FLAGS
  -p, --project=<value>  Project identifier

DESCRIPTION
  List agents by project

EXAMPLES
  $ roc agent list -p default
```

## `roc command`

```
USAGE
  $ roc command
```

_See code: [dist/commands/command.ts](https://github.com/yusufcanb/roc/blob/v0.1.0-alpha.0/dist/commands/command.ts)_

## `roc config get-project`

Set configurations for ROC

```
USAGE
  $ roc config get-project

DESCRIPTION
  Set configurations for ROC

EXAMPLES
  $ roc config get-project
  [OK] default-project
```

## `roc config get-url`

Set configurations for ROC

```
USAGE
  $ roc config get-url

DESCRIPTION
  Set configurations for ROC

EXAMPLES
  $ roc config get-url
  [OK] http://example.roc-service.local
```

## `roc config set-credentials`

Set credentials of ROC

```
USAGE
  $ roc config set-credentials -k <value> -s <value>

FLAGS
  -k, --key=<value>     (required) API Key of ROC Platform
  -s, --secret=<value>  (required) API Secret of ROC Platform

DESCRIPTION
  Set credentials of ROC

EXAMPLES
  $ roc config set-credentials --key [YOUR_KEY] --secret [YOUR_SECRET]
  [OK] Platform credentials saved
```

## `roc config set-project PROJECT`

Set default project for Robot Operation Center CLI

```
USAGE
  $ roc config set-project [PROJECT]

ARGUMENTS
  PROJECT  Identifier of project

DESCRIPTION
  Set default project for Robot Operation Center CLI

EXAMPLES
  $ roc config set-project default-project
  [OK] default project set
```

## `roc config set-url URL`

Set configurations for ROC

```
USAGE
  $ roc config set-url [URL]

ARGUMENTS
  URL  URL of the ROC Platform

DESCRIPTION
  Set configurations for ROC

EXAMPLES
  $ roc config set-url https://roc.platform
  ROC platform set to https://roc.platform
```

## `roc environment create`

Create new environment for specific project

```
USAGE
  $ roc environment create -n <value> -v <value> [-p <value>] [-d <value>]

FLAGS
  -d, --description=<value>  Description of the environment
  -n, --name=<value>         (required) Name of the environment
  -p, --project=<value>      Project identifier
  -v, --variables=<value>    (required) Variables file of the environment

DESCRIPTION
  Create new environment for specific project

EXAMPLES
  $ roc environment create -p default -n development -v variables.yaml
  [OK] Environment development created
```

## `roc environment delete [ID]`

Delete environment by its identifier

```
USAGE
  $ roc environment delete [ID]

DESCRIPTION
  Delete environment by its identifier

EXAMPLES
  $ roc environment delete development
  [OK] Environment development deleted
```

## `roc environment list`

List environments by project

```
USAGE
  $ roc environment list [-p <value>]

FLAGS
  -p, --project=<value>  Project identifier

DESCRIPTION
  List environments by project

EXAMPLES
  $ roc environment list -p default
```

## `roc environment variables ID`

Print variables of the environment

```
USAGE
  $ roc environment variables [ID]

DESCRIPTION
  Print variables of the environment

EXAMPLES
  $ roc environment variables [env-id]
```

## `roc help [COMMAND]`

Display help for roc.

```
USAGE
  $ roc help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for roc.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.9/src/commands/help.ts)_

## `roc project create`

Create new project

```
USAGE
  $ roc project create -n <value>

FLAGS
  -n, --name=<value>  (required) Name of project

DESCRIPTION
  Create new project

EXAMPLES
  $ roc project create -n New Project
  [OK] New Project created
```

## `roc project delete [ID]`

Delete project by its identifier

```
USAGE
  $ roc project delete [ID]

DESCRIPTION
  Delete project by its identifier

EXAMPLES
  $ roc project delete demo-project
  [OK] Environment demo-project deleted
```

## `roc project list`

List projects

```
USAGE
  $ roc project list

DESCRIPTION
  List projects

EXAMPLES
  $ roc project list
```

## `roc task-force create`

Create new task force for specific project

```
USAGE
  $ roc task-force create -p <value> -n <value>

FLAGS
  -n, --name=<value>     (required) Name of the task force
  -p, --project=<value>  (required) Project identifier

DESCRIPTION
  Create new task force for specific project

EXAMPLES
  $ roc task-force create -n api-health-checker -p default
  [OK] Task Force api-health-checker created
```

## `roc task-force delete [ID]`

Delete task force by its identifier

```
USAGE
  $ roc task-force delete [ID]

DESCRIPTION
  Delete task force by its identifier

EXAMPLES
  $ roc task-force delete form-processor
  [OK] Task force form-processor deleted
```

## `roc task-force exec ID`

Execute task force

```
USAGE
  $ roc task-force exec [ID] -e <value> -a <value>

FLAGS
  -a, --agent=<value>  (required) Agent identifier
  -e, --env=<value>    (required) Environment identifier

DESCRIPTION
  Execute task force

EXAMPLES
  $ roc task-force exec [task-force-id] --agent agent-1 --env development
  [OK] Job queued with agent agent-1 and environment development
```

## `roc task-force list`

List task forces by project

```
USAGE
  $ roc task-force list -p <value>

FLAGS
  -p, --project=<value>  (required) Project identifier

DESCRIPTION
  List task forces by project

EXAMPLES
  $ roc task-force list -p default
```
<!-- commandsstop -->
* [`oex hello PERSON`](#oex-hello-person)
* [`oex hello world`](#oex-hello-world)
* [`oex help [COMMAND]`](#oex-help-command)
* [`oex plugins`](#oex-plugins)
* [`oex plugins:inspect PLUGIN...`](#oex-pluginsinspect-plugin)
* [`oex plugins:install PLUGIN...`](#oex-pluginsinstall-plugin)
* [`oex plugins:link PLUGIN`](#oex-pluginslink-plugin)
* [`oex plugins:uninstall PLUGIN...`](#oex-pluginsuninstall-plugin)
* [`oex plugins update`](#oex-plugins-update)

## `oex hello PERSON`

Say hello

```
USAGE
  $ oex hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Whom is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/oclif/hello-world/blob/v0.0.0/dist/commands/hello/index.ts)_

## `oex hello world`

Say hello world

```
USAGE
  $ oex hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/world.ts)
```

## `oex help [COMMAND]`

Display help for oex.

```
USAGE
  $ oex help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for oex.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.10/src/commands/help.ts)_

## `oex plugins`

List installed plugins.

```
USAGE
  $ oex plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ oex plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `oex plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ oex plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ oex plugins:inspect myplugin
```

## `oex plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ oex plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ oex plugins add

EXAMPLES
  $ oex plugins:install myplugin 

  $ oex plugins:install https://github.com/someuser/someplugin

  $ oex plugins:install someuser/someplugin
```

## `oex plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ oex plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ oex plugins:link myplugin
```

## `oex plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ oex plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ oex plugins unlink
  $ oex plugins remove
```

## `oex plugins update`

Update installed plugins.

```
USAGE
  $ oex plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
