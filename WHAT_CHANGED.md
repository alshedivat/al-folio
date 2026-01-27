# What Changed in This Update

## For al-folio Users: Important Information

This update brings al-folio to Bootstrap 5 and updates all dependencies to their latest versions. Here's what you need to know:

## 🎨 Visual Changes

**Good News:** Your site should look the same! We've updated all the code to maintain the same appearance.

### What to Check After Updating:
1. **Navigation menu** - Make sure dropdowns still work
2. **Mobile view** - Check that the hamburger menu opens/closes
3. **Dark mode** - Verify the theme toggle works
4. **Interactive elements** - Test any tooltips or popovers

## 🔧 If You've Customized Your Site

If you've added custom HTML or CSS using Bootstrap classes, you may need to update:

### Bootstrap Class Name Changes:
- `ml-3` is now `ms-3` (margin-left → margin-start)
- `mr-3` is now `me-3` (margin-right → margin-end)  
- `pl-3` is now `ps-3` (padding-left → padding-start)
- `pr-3` is now `pe-3` (padding-right → padding-end)
- `text-left` is now `text-start`
- `text-right` is now `text-end`
- `float-left` is now `float-start`
- `float-right` is now `float-end`

### Data Attributes in HTML:
- `data-toggle="tooltip"` is now `data-bs-toggle="tooltip"`
- `data-toggle="dropdown"` is now `data-bs-toggle="dropdown"`
- `data-target="#myModal"` is now `data-bs-target="#myModal"`

**Example:**
```html
<!-- Old (Bootstrap 4) -->
<button class="btn ml-2" data-toggle="modal" data-target="#myModal">Click me</button>

<!-- New (Bootstrap 5) -->
<button class="btn ms-2" data-bs-toggle="modal" data-bs-target="#myModal">Click me</button>
```

## 📊 Library Updates

Your visualizations and other features use updated libraries:

### Major Updates (May Have New Features):
- **Bootstrap:** v4 → v5 (new components and utilities)
- **MathJax:** v3 → v4 (improved math rendering)
- **Mermaid:** v10 → v11 (new diagram types)
- **Chart.js, Plotly, Vega:** All updated to latest versions

### What This Means:
- Better performance
- Bug fixes
- New features available (check library docs if interested)
- Potential for slightly different rendering

## 🧪 Testing Your Site

After this update, please test:

1. **Build your site locally:**
   ```bash
   docker compose up
   # or
   bundle exec jekyll serve
   ```

2. **Check these pages:**
   - Home page
   - About page
   - Blog posts
   - Publications page
   - CV page
   - Any custom pages you've added

3. **Look for:**
   - Layout issues
   - Broken interactive elements
   - Console errors (press F12 in browser)
   - Math not rendering
   - Diagrams not showing

## ⚠️ Potential Issues

### Material Design Bootstrap (MDB) Components
If you use MDB components (you'll know if you do), they were built for Bootstrap 4 and might have minor issues. We're keeping MDB v4 for now, but you may want to update to MDB v5 in the future.

### Custom JavaScript
If you've added custom JavaScript that uses Bootstrap or jQuery, you may need to update it for Bootstrap 5's API changes.

## 🔄 If Something Breaks

Don't panic! Here's what to do:

### Quick Fix:
1. Check the browser console (F12) for errors
2. Compare your custom code to the examples in `BOOTSTRAP5_MIGRATION.md`
3. Update any Bootstrap 4 classes to Bootstrap 5 equivalents

### Need to Roll Back?
```bash
git revert HEAD~3..HEAD
```

Or restore individual files:
```bash
git checkout <previous-commit> -- <file-path>
```

See `BOOTSTRAP5_MIGRATION.md` for detailed rollback instructions.

## 📚 Resources

### Learn More About Bootstrap 5:
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/)
- [Bootstrap 4 to 5 Migration Guide](https://getbootstrap.com/docs/5.3/migration/)

### For Developers:
- Check `BOOTSTRAP5_MIGRATION.md` for technical details
- Check `DEPENDENCY_UPDATE_SUMMARY.md` for complete changelog

## ✨ Benefits of This Update

### Why Update?
- **Better performance** - Smaller file sizes, faster loading
- **Modern standards** - Using current web best practices
- **Security** - Latest versions have security fixes
- **New features** - Access to Bootstrap 5 improvements
- **Future-proof** - Bootstrap 4 is no longer maintained

### What You Get:
- ✅ Modern, maintained dependencies
- ✅ Better mobile responsiveness
- ✅ Improved accessibility
- ✅ Bug fixes from all updated libraries
- ✅ Same great al-folio design

## 🤝 Need Help?

1. **Check the migration guide:** `BOOTSTRAP5_MIGRATION.md`
2. **Search al-folio issues:** [GitHub Issues](https://github.com/alshedivat/al-folio/issues)
3. **Ask the community:** [GitHub Discussions](https://github.com/alshedivat/al-folio/discussions)

## 📝 Quick Checklist

After updating, check these items:

- [ ] Site builds without errors
- [ ] Home page displays correctly
- [ ] Navigation menu works (desktop and mobile)
- [ ] Blog posts render properly
- [ ] Publications page works
- [ ] CV page displays correctly
- [ ] Dark mode toggle works
- [ ] Math equations render (if you use them)
- [ ] Charts/diagrams display (if you use them)
- [ ] No console errors in browser

If all items check out, you're good to go! 🎉

## Summary

This is a **major but safe** update. We've done the heavy lifting to migrate everything to Bootstrap 5. For most users, everything will work exactly as before. Just test your site after updating, and you'll be running on modern, maintained code!

**Questions?** Check `BOOTSTRAP5_MIGRATION.md` for technical details or open an issue on GitHub.
