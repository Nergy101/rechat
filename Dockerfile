# Set the base image
FROM node:18.14

# Set the working directory
WORKDIR /

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Copy SMUI requirements
COPY src/theme ./src/theme
RUN mkdir static

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run prepare

# prevent  Host version "x" does not match binary version "y"
RUN rm -r -f ./node-modules
RUN npm install

# Expose the default SvelteKit port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev", "--verbose"]