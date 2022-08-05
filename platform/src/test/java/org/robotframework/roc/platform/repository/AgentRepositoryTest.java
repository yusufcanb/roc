package org.robotframework.roc.platform.repository;

import org.junit.jupiter.api.Test;
import org.robotframework.roc.core.agent.Agent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.Date;
import java.time.Instant;

@SpringBootTest
public class AgentRepositoryTest {

    @Autowired
    AgentRepository repository;

    @Test
    public void Test_AgentSave() throws Exception {
        Agent agent = new Agent();
        agent.setArch("hello");
        agent.setName("heo-re");
        agent.setHostName("hello");
        agent.setLastSeen(Date.from(Instant.now()));
        repository.save(agent);

        var agents = repository.findAll();
        assert agents.size() > 0;
    }

}
