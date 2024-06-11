package com.kwon.backend.common.util.sms;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;

@RequiredArgsConstructor
@ConfigurationProperties(prefix = "cool-sms")
@Getter
public class CoolSmsProperties {
    private final String apiKey;
    private final String apiSecret;
    private final String senderNumber;
}
