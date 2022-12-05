import {PostgrestResponse, SupabaseClient} from "@supabase/supabase-js";

export interface Entity {
    id:string;
}
export class BaseApi<E extends Entity, > {

    constructor(protected supabaseClient: SupabaseClient,
                protected entityName:string) {
    }

    async upsertMany(entities:Partial<E[]>) {
        await this.supabaseClient.from(this.entityName)
            .upsert(entities, {onConflict: 'id'});
    }

    async upsert(entity:Partial<E>) {
        await this.supabaseClient.from(this.entityName)
            .upsert(entity, {onConflict: 'id'});
    }
    async insert(entity:Partial<E>) {
        await this.supabaseClient.from(this.entityName)
            .insert(entity);
    }
    async findAll(limit:number = 1000):Promise<E[]> {
        const response = await this.supabaseClient
            .from(this.entityName)
            .select()
            .limit(limit);
        return (response.data as E[]).map(x => this.afterRead(x));
    }
    async findByIds(ids:string[]):Promise<E[]> {
        const response = await this.supabaseClient
            .from(this.entityName)
            .select()
            .in('id', ids);
        return (response.data as E[]).map(x => this.afterRead(x));
    }
    async findById(id:string):Promise<E|undefined> {
        return this.findByField('id', id);
    }

    async findManyByField(field:string,value:any):Promise<E[]> {
        const response = await this.supabaseClient
            .from(this.entityName)
            .select()
            .eq(field, value);
        return (response.data as E[]).map(x => this.afterRead(x));
    }
    async findByField(field:string,value:any) {
        const response = await this.supabaseClient
            .from(this.entityName)
            .select()
            .eq(field, value);
        return this.getOneFromResponse(response);
    }
    private getOneFromResponse(response:PostgrestResponse<any>):E|undefined {
        if (response?.data && response.data.length > 0) {
            return this.afterRead(response.data[0]);
        }
        return undefined;
    }

    protected afterRead(entity:E):E {
        return entity;
    }

}