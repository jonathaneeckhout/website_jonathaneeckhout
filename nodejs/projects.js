module.exports = {
    handleGet : function(server, data) {
        console.log("data is");
        console.log(data);
        //This is the page where the site should return to after filling in the form
        var numberOfProjects = {
            size : 3
        };
        return JSON.stringify(numberOfProjects);
    }
};
