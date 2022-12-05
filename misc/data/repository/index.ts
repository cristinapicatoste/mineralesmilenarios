import {createClient, SupabaseClient} from "@supabase/supabase-js";
import {MineralApi} from "./minerals";
import {ImageApi} from "./images";
import {SourceApi} from "./source";
import {MineralSourceApi} from "./mineralSource";


class Api {
    private readonly supabaseClient: SupabaseClient;
    constructor(private url:string, private key:string) {
        this.supabaseClient = createClient(this.url, this.key)
    }
    minerals():MineralApi {
        return new MineralApi(this.supabaseClient);
    }
    images():ImageApi {
        return new ImageApi(this.supabaseClient);
    }
    sources():SourceApi {
        return new SourceApi(this.supabaseClient);
    }
    mineralSource():MineralSourceApi {
        return new MineralSourceApi(this.supabaseClient);
    }
}

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';
export const api = new Api(supabaseUrl, supabaseKey);