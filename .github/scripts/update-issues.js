const fs = require('fs');
const path = require('path');
const github = require('@actions/github');
const core = require('@actions/core');

async function updateReadmeWithIssues() {
  try {
    // 获取GitHub token和仓库信息
    const token = process.env.GITHUB_TOKEN;
    const repo = process.env.REPO || github.context.repo;
    const octokit = github.getOctokit(token);
    
    // 解析仓库信息
    const [owner, repoName] = typeof repo === 'string' ? repo.split('/') : [repo.owner, repo.repo];
    
    core.info(`Fetching issues for ${owner}/${repoName}...`);
    
    // 获取issue列表（只获取open状态的issue）
    const { data: issues } = await octokit.rest.issues.listForRepo({
      owner,
      repo: repoName,
      state: 'open',
      per_page: 100, // 获取最多100个issue
      sort: 'created',
      direction: 'desc' // 最新的在前面
    });
    
    core.info(`Found ${issues.length} open issues`);
    
    // 读取README.md文件
    const readmePath = path.join(process.cwd(), 'README.md');
    let readmeContent = '';
    
    try {
      readmeContent = fs.readFileSync(readmePath, 'utf8');
    } catch (error) {
      core.info('README.md not found, creating a new one');
      readmeContent = '# Project\n\n';
    }
    
    // 生成issue列表的Markdown内容
    const issuesMarkdown = issues.length > 0 ? 
      issues.map(issue => `- [${issue.title}](${issue.html_url})`).join('\n') : 
      '- No open issues';
    
    // 定义issue列表的标记
    const issuesHeader = '## Open Issues';
    const issuesSection = `${issuesHeader}\n\n${issuesMarkdown}\n`;
    
    // 更新README内容
    let updatedContent = '';
    const issuesHeaderRegex = new RegExp(`${issuesHeader}[\s\S]*?(?=^##|$)`, 'm');
    
    if (issuesHeaderRegex.test(readmeContent)) {
      // 如果已存在issue部分，更新它
      updatedContent = readmeContent.replace(issuesHeaderRegex, issuesSection);
    } else {
      // 否则，添加到末尾
      updatedContent = readmeContent + (readmeContent.endsWith('\n') ? '' : '\n') + '\n' + issuesSection;
    }
    
    // 写回README.md
    fs.writeFileSync(readmePath, updatedContent, 'utf8');
    core.info('README.md updated successfully');
    
  } catch (error) {
    core.setFailed(`Error updating README with issues: ${error.message}`);
    throw error;
  }
}

// 执行更新
updateReadmeWithIssues();
