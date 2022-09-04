# Jsim Lazy Expandable

Light weight and easy to use expansion panel with lazy loaded content.

Built in Angular 13.

No dependencies on Angular Materials or Angular CDK.

Default styling based on Angular materials but fully costumizable with CSS classes of low specificity.

## Demo

Demo on [StackBlitz](https://stackblitz.com/edit/angular-ivy-sme39n)

## Usage

Import the LazyExpandableModule
Create the expandable panel with the element jsim-lazy-expandable

Contents of the panel can be set with directives and some properties.

### Directives

| Name                | Description                                   |
|---------------------|-----------------------------------------------|
| exp-header-title    | Content for the left of the Header            |
| exp-header-subtitle | Content for the right of the header           |
| exp-content         | Main content of the expansion panel           |
| *jsimLazyContent    | Directive to activate lazy loading of content |

### Properties

| Property             | Type                  | I/O    | Default | Description                                      |
|----------------------|-----------------------|--------|---------|--------------------------------------------------|
| isOpen               | boolean               | Input  | false   | Sets panel open or closed                        |
| openChanged          | EventEmitter<boolean> | Output | N/A     | Emits when open/close changes                    |
| hideIcon             | boolean               | Input  | false   | Sets arrow icon hidden                           |
| headerHeight         | number                | Input  | 48      | Height of header when collapsed in pixels        |
| headerHeightExpanded | number                | Input  | 64      | Height of header when expanded in pixels         |
| animationSpeed       | number                | Input  | 0.5     | Speed of animation in pixels per millisecond     |
| animationEnd         | EventEmitter<boolean> | Output | N/A     | Emits when animation end with current isOpen     |
| disabled             | boolean               | Input  | false   | Disables the expansion and collapse of the panel |

## Example

```html
<jsim-lazy-expandable [isOpen]="false">
    <div exp-header-title>This is my Title</div>
    <div exp-header-subtitle>This is a Description</div>
    <div exp-content *jsimLazyContent>
        <my-lazy-component></my-lazy-component>
    </div>
</jsim-lazy-expandable>
```

## Styling

Every element has a specific css class and most classes are very low specificity.

| Class                    | Description                             |
|--------------------------|-----------------------------------------|
| lazy-exp-container       | Outer container for expansion panel     |
| lazy-exp-header          | The header row                          |
| lazy-exp-header-title    | Content on the left side of the header  |
| lazy-exp-header-subtitle | Content of the right side of the header |
| lazy-exp-header-icon     | Arrow icon                              |
| lazy-exp-content         | Container of the main content           |

Css variables set in lazy-exp-container

| Variable                 | Description                      | Value            |
|--------------------------|----------------------------------|------------------|
| --background-color       | Color of the panel               | white            |
| --background-color-hover | Color of the Header when hovered | rgba(0,0,0,0.04) |
| --icon-color             | Color of the arrow icon          | rgb(119,119,119) |

## License

MIT
