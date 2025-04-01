build_frontend:
	@echo "Building the frontend..."
	yarn
	@echo "Done!"

build_backend:
	@echo "Building the backend..."
	cd src-tauri && cargo build --release
	@echo "Done!"

dev_mode:
	@echo "Running the app in dev mode..."
	yarn run tauri dev
	@echo "Done!"

desktop_app:
	@echo "Building the app..."
	yarn run tauri build && ./src-tauri/target/release/just_imagine
	@echo "Done!"