import PropTypes from "prop-types"

export const groupBy = (items = [], key) => {
    if (items.length === 0)
        return [];

    return items.reduce(
        (result, item) => ({
            ...result,
            [item[key]]: [
                ...(result[item[key]] || []),
                item,
            ],
        }),
        [],
    )
};

groupBy.prototype = {
    items: PropTypes.array.isRequired,
    key: PropTypes.string.isRequired
}
