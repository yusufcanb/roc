package org.robotframework.roc.core.project;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.io.Serializable;
import java.util.Date;

@Data
@NoArgsConstructor
@RedisHash("Project")
public class Project implements Serializable {

    private String id;

    @NotNull
    @Pattern(regexp = "^[a-z0-9-]+$", flags = Pattern.Flag.UNICODE_CASE)
    private String name;
    private String description;

    private Date createdAt;
    private Date updatedAt;

}
