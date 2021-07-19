package org.robotframework.roc.platform.controller;

import org.robotframework.roc.platform.dto.ErrorerResponseContent;
import org.robotframework.roc.platform.dto.ResponseContent;
import org.robotframework.roc.platform.dto.SuccessResponseContent;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class PublicKeyController {

    @Value("${roc.platform.ssh.authorized-keys}")
    private String authorizedKeysFilePath;

    @RequestMapping(value = "/public-key", method = RequestMethod.GET)
    public ResponseEntity<Map<String, Object>> getPublicKeys() {
        Map<String, Object> response = new HashMap<>();
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
            response.put("success", false);
            response.put("error", e.getMessage());
            response.put("publicKeys", new ArrayList<>());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        response.put("success", true);
        response.put("publicKeys", pubKeys);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/public-key", method = RequestMethod.POST)
    public ResponseEntity<ResponseContent> addPublicKey(@RequestBody PublicKeyController.PublicKeyRequestBody body) {
        File file = new File(this.authorizedKeysFilePath);

        try (FileWriter fw = new FileWriter(file, true); BufferedWriter writer = new BufferedWriter(fw)) {
            writer.write(body.key + "\n");
        } catch (IOException ioe) {
            return new ResponseEntity<>(new ErrorerResponseContent(ioe.getMessage()), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(new SuccessResponseContent<>(null), HttpStatus.OK);
    }

    public static class PublicKeyRequestBody {
        public String key;
    }

}
