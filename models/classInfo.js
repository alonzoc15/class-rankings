const db = require('./conn.js');

class ClassInfo {
    constructor(id, name, rank) {
        this.id = id;
        this.name = name;
        this.rank = rank;
    }

    static async getAllTopicData() {
        try {
            const response = await db.any(`SELECT 
                    topics.id, 
                    topics.topic_name, 
                    topics.status_id,
                    class_status.status_title
                    FROM topics 
                    INNER JOIN 
                    class_status on topics.status_id = class_status.id 
                ORDER BY topics.id;`);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async getAllClassStatus() {
        try {
            const response = await db.any(`SELECT * FROM class_status;`);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async update(topic, rank) {
        const query = `UPDATE topics SET status_id=${rank} WHERE topic_name = '${topic}'`
        try {
            const response = await db.result(query);
            console.log("response is", response);
            return response;
        } catch (err) {
            console.log("ERROR", err.message);
            return err;
        }
    }
}

module.exports = ClassInfo;