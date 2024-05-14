import { PHQ9 } from "@prisma/client";

export type QuisionerResponse = {
    question_id: number,
    severity: number
}

export type CreateQuisionerRequest = {
    question_id: number,
    severity: number
}

export function toQuisionerResponseArray(quisioners: PHQ9[]): QuisionerResponse[]{
    return quisioners.map(quisioner => ({
        question_id: quisioner.question_id,
        severity: quisioner.severity
    }))
}