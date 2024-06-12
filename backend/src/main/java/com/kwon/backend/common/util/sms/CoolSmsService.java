package com.kwon.backend.common.util.sms;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.exception.NurigoEmptyResponseException;
import net.nurigo.sdk.message.exception.NurigoMessageNotReceivedException;
import net.nurigo.sdk.message.exception.NurigoUnknownException;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class CoolSmsService {

    private final CoolSmsProperties properties;
    private DefaultMessageService messageService;

    @PostConstruct
    public void init() {
        messageService = NurigoApp
                .INSTANCE
                .initialize(
                        properties.getApiKey(),
                        properties.getApiSecret(),
                        "https://api.coolsms.co.kr"
                );
    }

    public void sendSms(String to, String subject, String messageText) {
        Message message = new Message();

        message.setFrom(properties.getSenderNumber().replaceAll("-", ""));
        message.setTo(to.replaceAll("-", ""));
        message.setText(messageText);
        message.setSubject(subject);

        requestCoolSms(message);
    }

    private void requestCoolSms(Message message) {
        try {
            messageService.send(message);
        } catch (NurigoMessageNotReceivedException | NurigoEmptyResponseException | NurigoUnknownException e) {
            log.error("{}", e);
            throw new RuntimeException("메시지 발송 실패");
        }
    }
}
