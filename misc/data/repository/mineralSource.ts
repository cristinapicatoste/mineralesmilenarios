import {BaseApi, Entity} from "./base";
import {SupabaseClient} from "@supabase/supabase-js";

export interface MineralSource extends Entity {
    source_id: string,
    mineral_id?:string,
    url: string,
    data: any,
}

export class MineralSourceApi extends BaseApi<MineralSource> {
    constructor(supabaseClient:SupabaseClient) {
        super(supabaseClient, 'mineral_source');
    }

    async upsertManyOnUrl(data:Partial<MineralSource>[])  {
        return this.supabaseClient.from(this.entityName)
            .upsert(data, {onConflict: 'url'})
    }

}