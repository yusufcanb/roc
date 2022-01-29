/*
 *   Copyright (c) 2021-2022 Yusuf Can Bayrak <yusufcanbayrak@gmail.com>
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 *   Contributors:
 *   Yusuf Can Bayrak - initial implementation and documentation.
 *
 */

package org.robotframework.roc.platform.project.service;

import org.robotframework.roc.core.models.GlobalVariable;
import org.robotframework.roc.core.models.Project;
import org.robotframework.roc.core.services.GlobalVariableService;
import org.robotframework.roc.platform.project.repository.GlobalVariableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;

@Service
public class GlobalVariableServiceImpl implements GlobalVariableService {

    @Autowired
    GlobalVariableRepository globalsRepository;

    @Override
    public void createGlobalVariable(GlobalVariable variable) {

    }

    @Override
    public void updateGlobalVariable(Long id, GlobalVariable variable) {

    }

    @Override
    public void deleteGlobalVariable(Long id) {

    }

    @Override
    public Collection<GlobalVariable> getGlobalVariablesByProject(Project project) {
        return new ArrayList<>();
    }

    @Override
    public boolean isExists(Long id) {
        return globalsRepository.existsById(id);
    }

}
