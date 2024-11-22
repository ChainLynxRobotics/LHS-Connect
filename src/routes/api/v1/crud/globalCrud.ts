import { BellScheduleDefaults } from "$lib/models/crud/bellScheduleDefaultsModel";
import { BellSchedule } from "$lib/models/crud/bellScheduleModel";
import { BellScheduleOverride } from "$lib/models/crud/bellScheduleOverrideModel";
import { BulletinBoardNote } from "$lib/models/crud/bulletinBoardModel";
import { Club } from "$lib/models/crud/clubModel";
import type { CrudSingleton } from "$lib/models/globalCrudModel";
import { ContactInfoLinkCard, UsefulLinksLinkCard } from "$lib/models/crud/linkCardModel";
import { bellScheduleDefaultsValidation } from "$lib/validation/crud/bellScheduleDefaultsSchema";
import { bellScheduleOverrideValidation } from "$lib/validation/crud/bellScheduleOverrideSchema";
import { bellScheduleValidation } from "$lib/validation/crud/bellScheduleSchema";
import { bulletinBoardNoteValidation } from "$lib/validation/crud/bulletinBoardSchema";
import { clubValidation } from "$lib/validation/crud/clubSchema";
import { linkCardValidation } from "$lib/validation/crud/linkCardSchema";
import { error } from "@sveltejs/kit";
import type { Model } from "mongoose";
import { type ObjectSchema } from "yup";

interface Service {
    // The db model
    model: typeof CrudSingleton,
    // The yup schema for validation
    validator: ObjectSchema<any>,
    // Whether the service can reorder the items, eg to use an "order" field and allow the user to change the order
    canReorder?: boolean,
    // If the service is a singleton, eg there will only be one of these in the db, basically a key-value pair
    singleton?: boolean
}

const services: { [key: string]: Service } = {
    "bellSchedule": {
        model: BellSchedule as Model<any>,
        validator: bellScheduleValidation,
        canReorder: true
    },
    "bellScheduleDefaults": {
        model: BellScheduleDefaults as Model<any>,
        validator: bellScheduleDefaultsValidation,
        singleton: true
    },
    "bellScheduleOverrides": {
        model: BellScheduleOverride as Model<any>,
        validator: bellScheduleOverrideValidation
    },
    "bulletinBoard": {
        model: BulletinBoardNote as Model<any>,
        validator: bulletinBoardNoteValidation,
        canReorder: true
    },
    "club": {
        model: Club as Model<any>,
        validator: clubValidation,
    },
    "contactInfoLinkCard": {
        model: ContactInfoLinkCard as Model<any>,
        validator: linkCardValidation,
        canReorder: true
    },
    "usefulLinksLinkCard": {
        model: UsefulLinksLinkCard as Model<any>,
        validator: linkCardValidation,
        canReorder: true
    }
}

export function getServiceData(serviceId: string) {
    const service = services[serviceId as keyof typeof services];
    if (service === undefined) return error(404, { message: "Service not found" });

    return service;
}