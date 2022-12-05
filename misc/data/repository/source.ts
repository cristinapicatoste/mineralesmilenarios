import {BaseApi, Entity} from "./base";
import {SupabaseClient} from "@supabase/supabase-js";

export type SourceName = 'Vives de la Cortada';

export interface Source extends Entity {
    name: SourceName,
    url: string,
}

export class SourceApi extends BaseApi<Source> {
    constructor(supabaseClient:SupabaseClient) {
        super(supabaseClient, 'source');
    }


}