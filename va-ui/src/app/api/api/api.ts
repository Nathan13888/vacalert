export * from './assessmentController.service';
import { AssessmentControllerService } from './assessmentController.service';
export * from './pingController.service';
import { PingControllerService } from './pingController.service';
export * from './vaccinationController.service';
import { VaccinationControllerService } from './vaccinationController.service';
export * from './vonageController.service';
import { VonageControllerService } from './vonageController.service';
export const APIS = [AssessmentControllerService, PingControllerService, VaccinationControllerService, VonageControllerService];
