package org.robotframework.roc.platform.project.service;

import org.apache.commons.io.FileUtils;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.robotframework.roc.core.models.CodeRepository;
import org.robotframework.roc.core.models.Project;
import org.robotframework.roc.core.services.FileService;
import org.robotframework.roc.core.services.GlobalVariableService;
import org.robotframework.roc.core.services.ProjectService;
import org.robotframework.roc.platform.project.repository.CodeRepoRepository;
import org.robotframework.roc.platform.project.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.Optional;

@Service
public class ProjectServiceImpl implements ProjectService {

    final ProjectRepository projectRepository;
    final CodeRepoRepository codeRepoRepository;

    final FileService fileService;
    final GlobalVariableService globalVariableService;

    @Value("${roc.platform.git.directory}")
    private String repositoriesDir;

    public ProjectServiceImpl(ProjectRepository projectRepository,
                              CodeRepoRepository codeRepoRepository,
                              FileServiceImpl fileService,
                              GlobalVariableService globalVariableService) {
        this.projectRepository = projectRepository;
        this.codeRepoRepository = codeRepoRepository;
        this.fileService = fileService;
        this.globalVariableService = globalVariableService;
    }

    private void initializeCodeRepository(String dir) throws GitAPIException {
        Git.init().setBare(true).setDirectory(new File(dir)).call();
    }

    @Override
    public Project createProject(Project project) {
        CodeRepository repo = new CodeRepository();
        try {
            Path path = Paths.get(repositoriesDir, project.getSlug() + ".git");
            repo.setPath(path.toString());
            this.initializeCodeRepository(repo.getPath());
            repo.setProject(project);
            project.setRepository(repo);
            return projectRepository.save(project);
        } catch (GitAPIException exception) {
            return null;
        }
    }

    @Override
    public Project updateProject(Long id, Project product) {
        return null;
    }

    @Override
    public void deleteProject(Long id) {
        Project project = projectRepository.getOne(id);
        projectRepository.deleteById(id);
        try {
            FileUtils.deleteDirectory(new File(project.getRepository().getPath()));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public Collection<Project> getProjects() {
        return this.projectRepository.findAll();
    }

    @Override
    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findById(id);
    }

    @Override
    public boolean isExists(Long id) {
        return projectRepository.existsById(id);
    }

}
