package org.robotframework.roc.platform.project.service;

import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.robotframework.roc.core.models.CodeRepository;
import org.robotframework.roc.core.models.Project;
import org.robotframework.roc.platform.project.repository.CodeRepoRepository;
import org.robotframework.roc.platform.project.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    final ProjectRepository projectRepository;
    final CodeRepoRepository codeRepoRepository;
    final FileService fileService;

    @Value("${roc.platform.git.directory}")
    private String repositoriesDir;


    public ProjectService(ProjectRepository projectRepository,
                          CodeRepoRepository codeRepoRepository,
                          FileService fileService) {
        this.projectRepository = projectRepository;
        this.codeRepoRepository = codeRepoRepository;
        this.fileService = fileService;
    }

    private void initializeCodeRepository(String dir) throws GitAPIException {
        Git.init().setBare(true).setDirectory(new File(dir)).call();
    }

    public List<Project> getAllProjects() {
        return this.projectRepository.findAll();
    }

    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findById(id);
    }

    @Transactional(rollbackOn = GitAPIException.class)
    public Project createNewProject(Project project) throws GitAPIException {
        CodeRepository repo = new CodeRepository();
        Path path = Paths.get(repositoriesDir, project.getSlug() + ".git");
        repo.setPath(path.toString());
        this.initializeCodeRepository(repo.getPath());
        repo.setProject(project);
        project.setRepository(repo);
        return projectRepository.save(project);
    }

}
