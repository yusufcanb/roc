package org.robotframework.roc.platform.project;

import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.lib.Ref;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.revwalk.RevCommit;
import org.eclipse.jgit.revwalk.RevTree;
import org.eclipse.jgit.revwalk.RevWalk;
import org.eclipse.jgit.treewalk.TreeWalk;
import org.robotframework.roc.core.models.CodeRepository;
import org.robotframework.roc.core.models.Project;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class ProjectService {

    final ProjectRepository projectRepository;
    final CodeRepoRepository codeRepoRepository;
    @Value("${roc.platform.git.directory}")
    private String repositoriesDir;

    public ProjectService(ProjectRepository projectRepository, CodeRepoRepository codeRepoRepository) {
        this.projectRepository = projectRepository;
        this.codeRepoRepository = codeRepoRepository;
    }

    private void initializeCodeRepository(String dir) throws GitAPIException {
        Git.init().setBare(true).setDirectory(new File(dir)).call();
    }

    public List<Project> getAllProjects() {
        try {
            Repository repository = CodeRepository.asGit("/Users/yusuf/Desktop/roc/default.git").getRepository();
            TreeWalk treeWalk = new TreeWalk(repository);
            Ref head = repository.getRef("HEAD");

            // a RevWalk allows to walk over commits based on some filtering that is defined
            RevWalk walk = new RevWalk(repository);

            RevCommit commit = walk.parseCommit(head.getObjectId());
            RevTree tree = commit.getTree();
            treeWalk.addTree(tree);
            treeWalk.setRecursive(false);

            while (treeWalk.next()) {
                if (treeWalk.isSubtree()) {
                    System.out.println("dir: " + treeWalk.getPathString());
                    treeWalk.enterSubtree();
                } else {
                    System.out.println("file: " + treeWalk.getPathString());
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return this.projectRepository.findAll();
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
