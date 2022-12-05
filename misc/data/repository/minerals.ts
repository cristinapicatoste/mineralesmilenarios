import {BaseApi, Entity} from "./base";
import {SupabaseClient} from "@supabase/supabase-js";


export interface Mineral extends Entity {
    name: string,
    description: string,
    formula: string,
    slug: string,
    image_id:string | null,
}

export class MineralApi extends BaseApi<Mineral> {
    constructor(supabaseClient:SupabaseClient) {
        super(supabaseClient, 'minerals');
    }

    async findBySlug(slug:string):Promise<Mineral|undefined> {

        return this.findByField('slug', slug);
    }

}