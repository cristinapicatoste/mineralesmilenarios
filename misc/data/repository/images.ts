import {BaseApi, Entity} from "./base";
import {SupabaseClient} from "@supabase/supabase-js";


export interface Image extends Entity {
    name: string,
    width:number,
    height:number,
    url:string
}

export class ImageApi extends BaseApi<Image> {
    constructor(supabaseClient:SupabaseClient) {
        super(supabaseClient, 'images');
    }


    override afterRead(entity:Image):Image {
        if (entity.name) {
            entity.url = this.supabaseClient.storage.from('web-images').getPublicUrl(entity.name).publicURL || '';
        }
        return entity;
    }
}