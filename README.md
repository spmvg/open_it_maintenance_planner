# Open IT Maintenance Planner

A visual tool to plan, document, and manage IT maintenance tasks and dependencies. Generate maintenance reports, visualize resource relationships, and track workload over time.

## Features
- **Visual Resource Management:** Drag and drop resources onto a canvas to model your IT environment.
- **Maintenance Plans:** Attach recurring maintenance plans to resources, specifying frequency and work effort.
- **Dependency Mapping:** Connect resources to show dependencies or architecture tiers.
- **Timeline & Events:** View a month-by-month workload timeline and a list of upcoming maintenance events.
- **JSON Export:** Switch to JSON mode to copy and save your resource and plan data.
- **No Data Storage:** Data is not persisted—copy your JSON before closing the app.

## Usage
1. **Add Resources:** Drag a resource type from the sidebar onto the canvas.
2. **Edit Details:** Double-click resource names or types to edit.
3. **Connect Resources:** Select a resource, click the arrow button, then click the target resource.
4. **Add Maintenance Plans:** Select a resource and click "Add Plan" in the toolbar.
5. **View Reports:** Click "Show Maintenance Report" to see a timeline and event list.
6. **Export Data:** Switch to JSON mode and use "Copy JSON" to save your work.

## FAQ
See the in-app FAQ for answers to common questions.

## Development
This project is built with [Vue.js](https://vuejs.org/).

### Project Setup
1. Install dependencies:
   ```sh
   npm install
   ```
2. Run the development server:
   ```sh
   npm run serve
   ```
3. Build for production:
   ```sh
   npm run build
   ```

## License
See [LICENSE](LICENSE).
