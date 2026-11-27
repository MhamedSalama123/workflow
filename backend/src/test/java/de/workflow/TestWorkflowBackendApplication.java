package de.workflow;

import org.springframework.boot.SpringApplication;

public class TestWorkflowBackendApplication {

	public static void main(String[] args) {
		SpringApplication.from(WorkflowBackendApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
