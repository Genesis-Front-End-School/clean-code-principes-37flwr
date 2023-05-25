### app/

App is used for rendering application with all the providers

### pages/

Pages is responsible for storing pages. Also I added routing logic to this layer because I felt like It would fit here better then if it would be a standalone layer

### widgets/

Widgets are responsible for merging small features and entities into some big parts of the application, like CoursesList on the main page

### features/

Features represent some functionality, that might be used across whole app, but their complexity makes them inappropriate for shared layer

### entities/

Entities represent building blocks of the application, which are used to build some complex parts out of them

### shared/

Shared layer is the most diverse layer in terms of it’s segments, but the idea behind this layer is to separate all the static parts of the app, such as constants, interfaces, mocks, styles and some ui components, whose usage is so wide, that they cannot fit into entities layer, because as FSD concepts state, one segment of the layer cannot use another segment of the same layer (Navbar, fallbacks, such as Loading and Error fallback etc.)

### store/

I separated store from the whole application into standalone layer, or I would rather say, entity, since it can communicate with each of the layers in the application. I did so, because while trying to figure out how to break it into small pieces and fit them into different layers and segments, I felt like breaking a working mechanism for no reason. Mostly because redux store I built utilises ducks methodology, which is by it’s nature is pretty scalable, so I felt like I was breaking a scalable decision into less scalable one just to meet FSD principles
