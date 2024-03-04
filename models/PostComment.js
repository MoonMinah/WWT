const PostCommentModel = (sequelize, DataTypes) => {
    const PostComment = sequelize.define(
        "PostComment",
        {
            commentID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            commentText: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            createDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            isModify: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            isDeleted: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            weather: {
                type: DataTypes.ENUM,
                values: ["sunny", "rainy", "snow", "cloudy"],
                allowNull: false,
            },
            region: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
        }
    );

    return PostComment;
};

module.exports = PostCommentModel;
