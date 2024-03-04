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
                allowNull: true,
            },
            createDate: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            freezeTableName: true,
        }
    );

    return CommentReply;
};

module.exports = CommentReplyModel;
