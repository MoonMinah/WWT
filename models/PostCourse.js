const PostCourseModel = (sequelize, DataTypes) => {
    const PostCourse = sequelize.define(
        "PostCourse",
        {
            courseNumber: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            courseImagePath: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            courseLon: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            courseLat: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            courseText: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            tableName: "PostCourse",
            freezeTableName: true,
            timestamps: true,
        }
    );

    return PostCourse;
};

module.exports = PostCourseModel;
