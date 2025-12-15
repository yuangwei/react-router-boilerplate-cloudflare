export const getKV = async (env: Env, key: string) => {
	return await env.KV.get(key);
};

export const setKV = async (env: Env, key: string, value: string) => {
	return await env.KV.put(key, value);
};

export const deleteKV = async (env: Env, key: string) => {
	return await env.KV.delete(key);
};

export const listKV = async (env: Env) => {
	return await env.KV.list();
};
