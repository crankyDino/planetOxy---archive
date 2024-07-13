const urlPageTitle = "Planet Oxy";

interface IUrlRoute {
    template: string,
    title: string,
    description: string,
}

// create an object that maps the url to the template, title, and description
const urlDirectory: { [key: string]: IUrlRoute } = {
    404: {
        template: "/pages/404.html",
        title: "404 | " + urlPageTitle,
        description: "Page not found",
    },
    "/": {
        template: "/pages/home.html",
        title: "Home | " + urlPageTitle,
        description: "This is the home page",
    },
    "/blog": {
        template: "/pages/blog/blog.html",
        title: "About Us | " + urlPageTitle,
        description: "This is the about page",
    },
    "/portfolio": {
        template: "/pages/portfolio/portfolio.html",
        title: "Contact Us | " + urlPageTitle,
        description: "This is the contact page",
    },
    "/projects": {
        template: "/pages/projects/projects.html",
        title: "Contact Us | " + urlPageTitle,
        description: "This is the contact page",
    },
};

// create a function that watches the url and calls the urlLocationHandler
function urlRoute(event?: MouseEvent): void {
    event = event // get window.event if event argument not provided
    if (event) {
        event.preventDefault();
        const target = event.target as HTMLAnchorElement;
        window.history.pushState({}, "", target.href);
        urlLocationHandler();
        // Add an event listener to handle the custom event
        window.addEventListener('urlLocationHandlerCompleted', () => {
            console.log('urlLocationHandler function has completed running.');
        });


        window.onpopstate = () => {
            urlLocationHandler();
        };
    }
};

// create a function that handles the url location
const urlLocationHandler = async (): Promise<void> => {
    let location: string = window.location.pathname; // get the url path
    // if the path length is 0, set it to primary page route
    if (location.length == 0) {
        location = "/";
    }
    // get the route object from the urlRoutes object
    let route: IUrlRoute = urlDirectory[location] || urlDirectory["404"];
    // get the html from the template
    await fetch(route.template)
        .then(response => response.text())
        .then(html => {
            // set the content of the content div to the html
            const content = document.getElementById("root");
            if (content) {
                content.innerHTML = html;
            }
            // set the title of the document to the title of the route
            document.title = route.title;
            // set the description of the document to the description of the route
            const descriptionMetaTag = document.querySelector('meta[name="description"]');
            if (descriptionMetaTag) {
                descriptionMetaTag.setAttribute("content", route.description);
            }
            // Dispatch custom event after function completes
            window.dispatchEvent(new Event('urlLocationHandlerCompleted'));
        });
};



export function initRouter(callback: () => void) {
    // create document click that watches the nav links only
    document.addEventListener("click", (e: MouseEvent) => {
        // if (Object.keys(!e.target).some((k)=> k.match("nav a"))) {
        console.log(e)
        console.log(e.target)
        if (!(e.target as any).matches("nav a")) {
            return;
        }

        e.preventDefault();
        urlRoute(e);
    });

    // add an event listener to the window that watches for url changes
    // window.onpopstate = urlLocationHandler;
    // // call the urlLocationHandler function to handle the initial url
    // (window as any).route = urlRoute;
    // // call the urlLocationHandler function to handle the initial url
    urlLocationHandler().then(callback);
}