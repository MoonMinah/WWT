const CommentReplyModel = (sequelize, DataTypes) => {
    const CommentReply = sequelize.define(
        "CommentReply",
        {
            replyID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            replyText: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            tableName: "CommentReply",
            freezeTableName: true,
            timestamps: true,
        }
    );

    return CommentReply;
};

module.exports = CommentReplyModel;
