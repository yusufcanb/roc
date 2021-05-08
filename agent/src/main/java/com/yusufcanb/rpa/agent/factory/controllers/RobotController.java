/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *  @author Yusuf Can Bayrak <yusufcanbayrak@gmail.com>
 */

package com.yusufcanb.rpa.agent.factory.controllers;


import com.yusufcanb.rpa.core.models.Robot;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RobotController {

    @RequestMapping("/robot")
    public Robot getRobot() {
        Robot r = new Robot();
        r.setId(1L);
        return r;
    }
    
}
