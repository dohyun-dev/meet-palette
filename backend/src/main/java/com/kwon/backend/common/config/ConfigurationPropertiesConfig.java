package com.kwon.backend.common.config;

import com.kwon.backend.common.util.sms.CoolSmsProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(CoolSmsProperties.class)
public class ConfigurationPropertiesConfig {
}
