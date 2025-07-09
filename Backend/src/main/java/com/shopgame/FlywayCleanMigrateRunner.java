package com.shopgame;

import org.flywaydb.core.Flyway;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class FlywayCleanMigrateRunner implements ApplicationRunner {
    private final Flyway flyway;

    public FlywayCleanMigrateRunner(Flyway flyway) {
        this.flyway = flyway;
    }

    @Override
    public void run(ApplicationArguments args) {
        flyway.clean();
        flyway.migrate();
    }
} 