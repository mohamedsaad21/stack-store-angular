import { createAction, props } from "@ngrx/store";



export const setRoles = createAction('RoleAssign', props<{ roles: string[] }>()
);
export const clearRoles = createAction('RoleClean');