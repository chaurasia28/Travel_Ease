// const calculateAvgRating = reviews => {
//     const totalRating = reviews?.reduce((acc, item) => acc + item.rating, 0)
//     const avgRating = totalRating === 0 ? '' : totalRating === 1 ? totalRating : totalRating / reviews?.length;
//     return {
//         totalRating,
//         avgRating,
//     };
// };
// export defalut calculateAvgRating;

const calculateAvgRating = reviews => {
    const totalRating = reviews?.reduce((acc, item) => acc + item.rating, 0)
    const avgRating = totalRating === 0 ? 0 : (totalRating / reviews?.length).toFixed(1);
    return {
        totalRating,
        avgRating,
    };
};
export default calculateAvgRating;