package org.robotframework.roc.platform.project.service;

import org.eclipse.jgit.lib.*;
import org.eclipse.jgit.revwalk.RevCommit;
import org.eclipse.jgit.revwalk.RevTree;
import org.eclipse.jgit.revwalk.RevWalk;
import org.eclipse.jgit.treewalk.TreeWalk;
import org.robotframework.roc.core.beans.ProjectFile;
import org.robotframework.roc.core.beans.ProjectFileType;
import org.robotframework.roc.core.models.CodeRepository;
import org.robotframework.roc.core.models.Project;
import org.robotframework.roc.core.services.FileService;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

@Service
public class FileServiceImpl implements FileService {

    private ProjectFile createNewProjectFile(String identifier, String name, ProjectFileType type) {
        ProjectFile pf = new ProjectFile();
        pf.setId(identifier);
        pf.setName(name);
        pf.setType(type);
        pf.setChildren(type == ProjectFileType.DIRECTORY ? new ArrayList<>() : null);
        return pf;
    }

    private void walk(List<ProjectFile> files, String path, String identifier, ProjectFileType type) {
        String[] arr = path.split("/");
        if (arr.length == 1) {
            files.add(createNewProjectFile(identifier, arr[0], type));
        } else {
            for (String index : path.split("/")) {
                ProjectFile file = files.stream()
                        .filter(f -> index.equals(f.getName()))
                        .filter(f -> f.getType() == ProjectFileType.DIRECTORY)
                        .findAny()
                        .orElse(null);
                if (file != null) {
                    String newPath = String.join("/", Arrays.copyOfRange(arr, 1, arr.length));
                    walk(file.getChildren(), newPath, identifier, type);
                }
            }
        }
    }

    @Override
    public List<ProjectFile> getProjectFiles(Project project) throws IOException {
        List<ProjectFile> projectFiles = new LinkedList<>();

        Repository repository = CodeRepository.asGit(project.getRepository().getPath()).getRepository();
        TreeWalk treeWalk = new TreeWalk(repository);
        Ref head = repository.getRef("HEAD");

        RevWalk walk = new RevWalk(repository);
        RevCommit commit = walk.parseCommit(head.getObjectId());
        RevTree tree = commit.getTree();

        treeWalk.addTree(tree);
        treeWalk.setRecursive(false);

        while (treeWalk.next()) {
            ProjectFileType type = treeWalk.isSubtree() ? ProjectFileType.DIRECTORY : ProjectFileType.FILE;
            this.walk(projectFiles, treeWalk.getPathString(), treeWalk.getPathString(), type);
            if (treeWalk.isSubtree()) {
                treeWalk.enterSubtree();
            }
        }
        return projectFiles;
    }

    @Override
    public String getProjectFileContent(Project project, String path) throws IOException {
        Repository repository = CodeRepository.asGit(project.getRepository().getPath()).getRepository();
        ObjectId lastCommitId = repository.resolve(Constants.HEAD);
        RevWalk revWalk = new RevWalk(repository);
        try {
            RevCommit commit = revWalk.parseCommit(lastCommitId);
            TreeWalk treeWalk = TreeWalk.forPath(repository, path, commit.getTree());
            ObjectId blobId = treeWalk.getObjectId(0);
            try {
                ObjectReader objectReader = repository.newObjectReader();
                ObjectLoader objectLoader = objectReader.open(blobId);
                byte[] bytes = objectLoader.getBytes();
                return new String(bytes, StandardCharsets.UTF_8);
            } catch (Exception e1) {
                e1.printStackTrace();
            }
            revWalk.dispose();
        } catch (Exception e2) {
            e2.printStackTrace();
        }
        return null;
    }
}
