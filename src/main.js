// 格式化reducers，输入任意数量models，返回标准reducers对象
export const reduxReduers = (models) => {
    const reducers = {};
    models.map((model) => {
        reducers[model.namespace] = (state, action) => {
            const [key, type] = action.type.split('/');
            if (key && type && key === model.namespace && typeof model.reducers[type] === 'function') {
                return model.reducers[type](state, action);
            }
            return state || model.initState || {};
        };
    });
    return reducers;
};


// 格式化effects，输入任意数量models，返回effects中间件
export const reduxEffects = models => store => next => async (action) => {
    next(action);
    const [key, type] = action.type.split('/');
    if (!key || !type) return;
    const model = models.find(i => i.namespace === key);
    if (model && model.effects && typeof model.effects[type] === 'function') {
        await model.effects[type](store, action);
    }
};
