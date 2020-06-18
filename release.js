var child_process = require("child_process");
var version = process.argv[2];
if (!version) {
    console.log("Please specify the version, e.g. node release.js 1.0.3");
    process.exit(1);
}

console.log("Releasing...");
var releaseCmd = "aws s3 cp s3://ifrost.aws.playground/" + version +  " s3://ifrost.aws.playground --recursive";
child_process.execSync(releaseCmd, { stdio: 'inherit' });

console.log("Invalidating cache...");
var invalidateCmd = 'aws cloudfront create-invalidation --distribution-id ' + process.env.AWS_CLOUDFRONT_DISTRIBUTION_ID + ' --paths "/*"\n';
child_process.execSync(invalidateCmd, { stdio: 'inherit' });