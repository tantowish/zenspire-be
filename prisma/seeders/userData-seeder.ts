import { Gender } from "@prisma/client";

export const userData = [
    {
      "user_id": 1,
      "gender": "P" as Gender,
      "birthday": new Date("2002-02-12"),
      "health_condition": ["Asma", "Asam Lambung"]
    },
    {
      "user_id": 2,
      "gender": "L" as Gender,
      "birthday": new Date("2005-12-23"),
      "health_condition": ["Asam Urat"]
    },
    {
      "user_id": 3,
      "gender": "P" as Gender,
      "birthday": new Date("2001-01-23"),
      "health_condition": ["Cidera Patah Tulang"]
    },
  ]