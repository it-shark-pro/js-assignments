### 1. Add remote from original repository in your forked repository: 

    `cd path/into/cloned/fork-repo`
    `git remote add upstream git@github.com:it-shark-pro/js-assignments.git`
    `git fetch upstream`

### 2. Updating your fork from original repo to keep up with their changes:

    `git pull upstream master`

### 3. Resolve conflicts if needed and install npm packages
    `npm update`
