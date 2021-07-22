package org.robotframework.roc.platform.project.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@RestController
public class PublicKeyController {

    @Value("${roc.platform.git.public-keys}")
    private String authorizedKeysFilePath;

    @RequestMapping(value = "/projects/public-keys", method = RequestMethod.GET)
    public ResponseEntity<List<String>> getPublicKeys() {
        List<String> pubKeys = new ArrayList<>();
        try {
            final BufferedReader in = new BufferedReader(
                    new InputStreamReader(new FileInputStream(authorizedKeysFilePath), StandardCharsets.UTF_8));
            String line;
            while ((line = in.readLine()) != null) {
                pubKeys.add(line);
            }
            in.close();
        } catch (final IOException e) {
            return new ResponseEntity<>(pubKeys, HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(pubKeys, HttpStatus.OK);
    }

    @RequestMapping(value = "/projects/public-keys", method = RequestMethod.POST)
    public ResponseEntity<String> addPublicKey(@RequestBody PublicKeyController.PublicKeyRequestBody body) {
        File file = new File(this.authorizedKeysFilePath);

        try (FileWriter fw = new FileWriter(file, true); BufferedWriter writer = new BufferedWriter(fw)) {
            writer.write(body.key + "\n");
        } catch (IOException ioe) {
            return new ResponseEntity<>(ioe.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    public static class PublicKeyRequestBody {
        public String key;
    }

}
