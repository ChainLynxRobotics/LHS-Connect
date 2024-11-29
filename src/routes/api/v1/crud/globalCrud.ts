import { BellScheduleDefaults } from "$lib/models/crud/bellScheduleDefaultsModel";
import { BellSchedule } from "$lib/models/crud/bellScheduleModel";
import { BellScheduleOverride } from "$lib/models/crud/bellScheduleOverrideModel";
import { BulletinBoardNote } from "$lib/models/crud/bulletinBoardModel";
import { Club } from "$lib/models/crud/clubModel";
import type { CrudSingleton } from "$lib/models/globalCrudModel";
import { ContactInfoLinkCard, UsefulLinksLinkCard } from "$lib/models/crud/linkCardModel";
import { error } from "@sveltejs/kit";
import type { Model } from "mongoose";
import { type ObjectSchema } from "yup";
import bellScheduleDefaultsValidator from "$lib/validation/crud/bellScheduleDefaultsValidator";
import bellScheduleOverrideValidator from "$lib/validation/crud/bellScheduleOverrideValidator";
import bellScheduleValidator from "$lib/validation/crud/bellScheduleValidator";
import clubValidator from "$lib/validation/crud/clubValidator";
import linkCardValidator from "$lib/validation/crud/linkCardValidator";
import bulletinBoardNoteValidator from "$lib/validation/crud/bulletinBoardNoteValidator";

interface Service {
    // The db model
    model: typeof CrudSingleton,
    // The yup schema for Validator
    validator: ObjectSchema<any>,
    // Whether the service can reorder the items, eg to use an "order" field and allow the user to change the order
    canReorder?: boolean,
    // If the service is a singleton, eg there will only be one of these in the db, basically a key-value pair
    singleton?: boolean
}

const services: { [key: string]: Service } = {
    "bellSchedules": {
        model: BellSchedule as Model<any>,
        validator: bellScheduleValidator,
        canReorder: true
    },
    "bellScheduleDefaults": {
        model: BellScheduleDefaults as Model<any>,
        validator: bellScheduleDefaultsValidator,
        singleton: true
    },
    "bellScheduleOverrides": {
        model: BellScheduleOverride as Model<any>,
        validator: bellScheduleOverrideValidator
    },
    "bulletinBoardNotes": {
        model: BulletinBoardNote as Model<any>,
        validator: bulletinBoardNoteValidator,
        canReorder: true
    },
    "clubs": {
        model: Club as Model<any>,
        validator: clubValidator,
    },
    "contactInfo": {
        model: ContactInfoLinkCard as Model<any>,
        validator: linkCardValidator,
        canReorder: true
    },
    "usefulLinks": {
        model: UsefulLinksLinkCard as Model<any>,
        validator: linkCardValidator,
        canReorder: true
    }
}

export function getServiceData(serviceId: string) {
    const service = services[serviceId as keyof typeof services];
    if (service === undefined) return error(404, { message: "Service not found" });

    return service;
}